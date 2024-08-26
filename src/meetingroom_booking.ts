/**
 * 企业微信API-会议室预定
 */
import axios from 'axios';
import { GetToken, WecomError, getToken, qyHost } from 'wecom-common';
import Debug from 'debug';
import {
    CancelMeetingroomBookingParams,
    MeetingroomBookingByMeetingParams,
    MeetingroomBookingByScheduleParams, MeetingroomBookingByScheduleResult, MeetingroomBookingDetailParams,
    MeetingroomBookingParams,
    MeetingroomBookingResult,
    QueryMeetingroomBookingParams,
    QueryMeetingroomBookingResult
} from "./type";
const warn = Debug('wecom-meetingroom:warn');
const error = Debug('wecom-meetingroom:error');
const info = Debug('wecom-meetingroom:info');
const debug = Debug('wecom-meetingroom:debug');

/**
* 查询会议室的预定信息
* 企业可通过此接口查询相关会议室在指定时间段的预定情况，如是否已被预定，预定者的userid等信息，不支持跨天查询。
* @see https://developer.work.weixin.qq.com/document/path/93620
* @returns
*/
export const list = async (params: QueryMeetingroomBookingParams, options: GetToken): Promise<any | QueryMeetingroomBookingResult[]> => {
 const token = await getToken(options);
 const res = await axios.post(`${qyHost}/oa/meetingroom/get_booking_info?access_token=${token}`, params);
 if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
 return res.data.booking_list;
}

/**
 * 预定会议室
 * 企业可通过此接口预定会议室并自动关联日程
 * 最小预定时长为30分钟；
 * 预定时间和结束时间会自动按30分钟取整，即如果传入的开始和结束时间戳分别对应时间为15:15和15:45，则预定时会自动取整为15:00和16:00；
 * 此API仅可预定无需审批的会议室；
 * 如果当前时间已经晚于预定时间，则按以下情况进行处理：
 * 1.当前已过预定结束时间，则不允许预定
 * 2.当前在预定开始时间15分钟内，则允许预定
 * 3.当前已超过预定开始时间15分钟，则自动转换预定开始时间到下一个时间窗口，即增加30分钟到开始时间
 */
export const add = async (params: MeetingroomBookingParams, options: GetToken): Promise<any | MeetingroomBookingResult> => {
  const token = await getToken(options);
  const res = await axios.post(`${qyHost}/oa/meetingroom/book?access_token=${token}`, params);
  if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
  return {booking_id: res.data.meetingroom_id, schedule_id: res.data.schedule_id};
}

/**
 * 通过日程预定会议室
 * 企业可通过此接口为指定日程预定会议室，支持重复日程预定
 * 通过日程预定会议室后，该日程将不能通过更新日程接口进行编辑，而只能调用新增日程参与者与删除日程参与者接口
 * 如果需要更新日程的时间等字段，可以先取消会议室预定，再调用更新日程接口，之后再重新预定会议室
 */
export const addBySchedule = async (params: MeetingroomBookingByScheduleParams, options: GetToken): Promise<any | MeetingroomBookingByScheduleResult> => {
    const token = await getToken(options);
    const res = await axios.post(`${qyHost}/oa/meetingroom/book_by_schedule?access_token=${token}`, params);
    if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
    return {booking_id: res.data.booking_id, conflict_date: res.data.conflict_date};
}

/**
 * 通过会议预定会议室
 * 企业可通过此接口为指定会议预定会议室，支持重复会议预定
 */
export const addByMeeting = async (params: MeetingroomBookingByMeetingParams, options: GetToken): Promise<any | MeetingroomBookingByScheduleResult> => {
    const token = await getToken(options);
    const res = await axios.post(`${qyHost}/oa/meetingroom/book_by_meeting?access_token=${token}`, params);
    if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
    return {booking_id: res.data.booking_id, conflict_date: res.data.conflict_date};
}


/**
 * 取消预定会议室
 * 企业可通过此接口取消会议室的预定
 */
export const cancel = async (params: CancelMeetingroomBookingParams, options: GetToken) => {
  const token = await getToken(options);
  const res = await axios.post(`${qyHost}/oa/meetingroom/cancel_book?access_token=${token}`, params);
  if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
  return 0;
}

/**
 * 根据会议室预定ID查询预定详情
 * 企业可通过此接口根据预定id查询相关会议室的预定情况
 */
export const detail = async(params: MeetingroomBookingDetailParams, options: GetToken): Promise<any | QueryMeetingroomBookingResult> => {
  const token = await getToken(options);
  const res = await axios.post(`${qyHost}/oa/meetingroom/bookinfo/get?access_token=${token}`, params);
  if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
  return {meetingroom_id: res.data.meetingroom_id, schedule: res.data.schedule};
}