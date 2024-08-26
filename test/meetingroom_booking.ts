import { env } from 'node:process';
import * as cache from 'memory-cache';
import { after, describe, it } from 'node:test';
import { equal, ok } from 'node:assert';
import { MeetingroomBooking } from '../src';
import {
  MeetingroomBookingDetailParams, MeetingroomBookingParams,
  QueryMeetingroomBookingParams
} from "../src/type";

const {
  CORP_ID,
  SECRET,
} = env;

const options = {
  corpId: CORP_ID,
  secret: SECRET,
};

let meetingroom_id = 24
let booking_id = "bkztTbamfnXT9rMr_NHn60B_ODKpwoz2Jnnd7cquQ6WT0"
let schedule_id = ""

describe('Meetingroom', function() {
  after(() => cache.clear());
  it('预定会议室', async () => {
    const params: MeetingroomBookingParams = {
      meetingroom_id: meetingroom_id,
      start_time: 1724398200,
      end_time: 1724401800,
      booker: "",
      attendees: [""],
    }
    const res = await MeetingroomBooking.add(params, options);
    console.log(res);
    ok(res);
    booking_id = res.booking_id;
    schedule_id = res.schedule_id;
  });

  it('查询会议室', async () => {
    const params: QueryMeetingroomBookingParams = {
      meetingroom_id: meetingroom_id,
    }
    const res = await MeetingroomBooking.list(params, options);
    ok(res?.length);
    console.log(res[0].schedule)
  });

  it('根据会议室预定ID查询预定详情', async () => {
    const params: MeetingroomBookingDetailParams = {
      meetingroom_id: meetingroom_id,
      booking_id: booking_id,
    }
    const res = await MeetingroomBooking.detail(params, options);
    ok(res);
    console.log(res)
  });

  it('取消会议室', async () => {
    const params = {
      booking_id: booking_id,
      keep_schedule: 0,
    }
    const res = await MeetingroomBooking.cancel(params, options);
    equal(res, 0);
    console.log(res)
  });
});