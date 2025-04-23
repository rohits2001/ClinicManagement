class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :edit, :update, :destroy]
  before_action :ensure_receptionist, only: [:new, :create, :edit, :update, :destroy]

  def index
    @patients = Patient.all.order(created_at: :desc)
    @patients_by_day = Patient.group_by_day(:created_at).count
  end

  def show
  end

  def new
    @patient = Patient.new
  end

  def create
    @patient = Patient.new(patient_params)
    
    if @patient.save
      redirect_to patients_path, notice: 'Patient was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @patient.update(patient_params)
      redirect_to patients_path, notice: 'Patient was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @patient.destroy
    redirect_to patients_path, notice: 'Patient was successfully deleted.'
  end

  private

  def set_patient
    @patient = Patient.find(params[:id])
  end

  def patient_params
    params.require(:patient).permit(
      :first_name, :last_name, :email, :phone,
      :date_of_birth, :address, :gender, :medical_history
    )
  end

  def ensure_receptionist
    unless current_user.receptionist?
      redirect_to patients_path, alert: 'Only receptionists can modify patient records.'
    end
  end
end