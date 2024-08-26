import { env } from 'node:process';
import * as cache from 'memory-cache';
import { after, describe, it } from 'node:test';
import { equal, ok } from 'node:assert';
import { Meetingroom } from '../src';
import {AddMeetingroomParams, EditMeetingroomParams, QueryMeetingroomParams} from "../src/type";

const {
  CORP_ID,
  SECRET,
} = env;

const options = {
  corpId: CORP_ID,
  secret: SECRET,
};

let meetingroom_id = -1

describe('Meetingroom', function() {
  after(() => cache.clear());
  it('添加会议室', async () => {
    const params: AddMeetingroomParams = {
      name: "接口调用添加会议室",
      capacity: 2,
      range: {
        user_list: [""]
      }
    }
    const res = await Meetingroom.add(params, options);
    ok(res);
    meetingroom_id = res;
    console.log(res);
  });

  it('编辑会议室', async () => {
    const params: EditMeetingroomParams = {
      meetingroom_id: meetingroom_id,
      name: "接口调用添加会议室2",
      capacity: 2,
      range: {
        user_list: [""]
      }
    }
    const res = await Meetingroom.edit(params, options);
    equal(res, 0);
    console.log(res)
  });

  it('查询会议室', async () => {
    const params: QueryMeetingroomParams = {
      city: "",
      building: "",
      floor: "",
      equipment: [1],
    }
    const res = await Meetingroom.list(params, options);
    ok(res?.length);
    console.log(res)
  });

  it('删除会议室', async () => {
    const params = {
      meetingroom_id: meetingroom_id,
    }
    const res = await Meetingroom.del(params, options);
    equal(res, 0);
    console.log(res)
  });
});