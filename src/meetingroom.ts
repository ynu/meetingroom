/**
 * 企业微信API-会议室
 */
import axios from 'axios';
import { GetToken, WecomError, getToken, qyHost } from 'wecom-common';
import Debug from 'debug';
import {
    AddMeetingroomParams,
    AddMeetingroomResult,
    EditMeetingroomParams,
    QueryMeetingroomParams,
    QueryMeetingroomResult
} from "./type";
const warn = Debug('wecom-meetingroom:warn');
const error = Debug('wecom-meetingroom:error');
const info = Debug('wecom-meetingroom:info');
const debug = Debug('wecom-meetingroom:debug');

/**
* 查询会议室
* 企业可通过此接口查询满足条件的会议室
* @see https://developer.work.weixin.qq.com/document/path/93619
* @returns
*/
export const list = async (params: QueryMeetingroomParams, options: GetToken): Promise<any | QueryMeetingroomResult[]> => {
 const token = await getToken(options);
 const res = await axios.post(`${qyHost}/oa/meetingroom/list?access_token=${token}`, params);
 if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
 return res.data.meetingroom_list;
}

/**
 * 添加会议室
 * 企业可通过此接口添加一个会议室
 * @see https://developer.work.weixin.qq.com/document/path/93619
 */
export const add = async (params: AddMeetingroomParams, options: GetToken): Promise<any | AddMeetingroomResult> => {
  const token = await getToken(options);
  const res = await axios.post(`${qyHost}/oa/meetingroom/add?access_token=${token}`, params);
  if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
  return res.data.meetingroom_id;
}

/**
 * 删除会议室
 * 企业可通过此接口删除指定的会议室
 */
export const del = async (params: {meetingroom_id: number}, options: GetToken) => {
  const token = await getToken(options);
  const res = await axios.post(`${qyHost}/oa/meetingroom/del?access_token=${token}`, params);
  if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
  return 0;
}

/**
 * 编辑会议室
 * 企业可通过此接口编辑相关会议室的基本信息
 */
export const edit = async(params: EditMeetingroomParams, options: any) => {
  const token = await getToken(options);
  const res = await axios.post(`${qyHost}/oa/meetingroom/edit?access_token=${token}`, params);
  if (res.data.errcode) throw new WecomError(res.data.errcode, res.data.errmsg);
  return 0;
}