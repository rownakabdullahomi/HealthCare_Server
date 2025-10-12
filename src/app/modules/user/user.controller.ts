import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response)=>{
    const result = await userService.createPatient(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully.",
        data: result
    })
})



export const userController = {
    createPatient
}