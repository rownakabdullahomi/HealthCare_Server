import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import { IJWTPayload } from "../../types/common";


const createAppointment = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const user = req.user;
    const result = await AppointmentService.createAppointment(user as IJWTPayload , req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Appointment created successfully!",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
};
