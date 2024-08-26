/**
 * 会议室设备
 */
export enum MeetingroomDevice {
    /**
     * 电视
     */
    TV = 1,
    /**
     * 电话
     */
    PHONE = 2,
    /**
     * 投影
     */
    PROJECTOR = 3,
    /**
     * 白板
     */
    WHITEBOARD = 4,
    /**
     * 视频
     */
    VIDEO = 5,
}

/**
 * 企业微信API响应结果
 */
export type WecomResponse = {
    /**
     * 错误码，0表示成功
     */
    errcode: number;

    /**
     * 错误信息
     */
    errmsg: string;
};

/**
 * 用于添加Meetingroom的请求参数结构
 */
export type AddMeetingroomParams = {
    /**
     * 会议室名称，最多30个字符
     */
    name: string,
    /**
     * 会议室所能容纳的人数
     */
    capacity: number,
    /**
     * 会议室所在城市
     */
    city?: string,
    /**
     * 会议室所在楼宇
     */
    building?: string,
    /**
     * 会议室所在楼层
     */
    floor?: string,
    /**
     * 会议室支持的设备列表
     */
    equipment?: MeetingroomDevice[],
    coordinate?: {
        /**
         * 会议室所在建筑纬度
         */
        latitude: number,
        /**
         * 会议室所在建筑经度
         */
        longitude: number,
    },
    range?: {
        /**
         * 会议室使用范围的userid列表，最多指定1000个成员
         */
        user_list?: string[],
        /**
         * 会议室使用范围的部门id列表，最多指定1000个部门
         */
        department_list?: string[]
    },
}

/**
 * 用于添加Meetingroom的返回结果
 */
export type AddMeetingroomResult = {
    /**
     * 会议室的ID
     */
    meetingroom_id: number
}

/**
 * 用于查询Meetingroom的请求参数结构
 */
export type QueryMeetingroomParams = {
    /**
     * 会议室所在城市
     */
    city?: string,
    /**
     * 会议室所在楼宇
     */
    building?: string,
    /**
     * 会议室所在楼层
     */
    floor?: string,
    /**
     * 会议室支持的设备列表
     */
    equipment?: MeetingroomDevice[],
}

/**
 * 用于查询Meetingroom的返回结果
 */
export type QueryMeetingroomResult = {
    /**
     * 会议室id
     */
    meetingroom_id: number,
    /**
     * 会议室名称，最多30个字符
     */
    name: string,
    /**
     * 会议室所能容纳的人数
     */
    capacity: number,
    /**
     * 会议室所在城市
     */
    city?: string,
    /**
     * 会议室所在楼宇
     */
    building?: string,
    /**
     * 会议室所在楼层
     */
    floor?: string,
    /**
     * 会议室支持的设备列表
     */
    equipment?: MeetingroomDevice[],
    coordinate?: {
        /**
         * 会议室所在建筑纬度
         */
        latitude: number,
        /**
         * 会议室所在建筑经度
         */
        longitude: number,
    },
    /**
     * 是否需要审批 0-无需审批 1-需要审批
     */
    need_approval: number,
    range?: {
        /**
         * 会议室使用范围的userid列表，最多指定1000个成员
         */
        user_list?: string[],
        /**
         * 会议室使用范围的部门id列表，最多指定1000个部门
         */
        department_list?: string[]
    },
}

/**
 * 用于编辑Meetingroom的请求参数结构
 */
export type EditMeetingroomParams = {
    /**
     * 会议室的id
     */
    meetingroom_id: number
} & AddMeetingroomParams

/**
 * 用于查询会议室的预定信息的请求参数结构
 */
export type QueryMeetingroomBookingParams = {
    /**
     * 会议室的id
     */
    meetingroom_id?: number
    /**
     * 查询预定的起始时间，默认为当前时间
     */
    start_time?: number
    /**
     * 查询预定的结束时间， 默认为明日0时
     */
    end_time?: number
    /**
     * 会议室所在城市
     */
    city?: string,
    /**
     * 会议室所在楼宇
     */
    building?: string,
    /**
     * 会议室所在楼层
     */
    floor?: string,
}

/**
 * 用于查询会议室的预定信息的返回结果
 */
export type QueryMeetingroomBookingResult = {
    /**
     * 会议室id
     */
    meetingroom_id: number,
    /**
     * 该会议室查询时间段内的预定情况
     */
    schedule: {
        /**
         * 开始时间的时间戳
         */
        start_time: number,
        /**
         * 结束时间的时间戳
         */
        end_time: number,
        /**
         * 预定人的userid
         */
        booker: string,
        /**
         * 会议室的预定状态，0：已预定、1：已取消 、2：申请中、3：审批中
         */
        status: number,
        /**
         * 会议室的预定id
         */
        booking_id: string,
        /**
         * 根据会议室预定ID查询预定详情有此字段，如果该预定是某个周期性预定的一部分，则返回对应周期性预定的booking_id
         */
        master_booking_id?: string,
        /**
         * 会议关联日程的id，若会议室已取消预定（未保留日历），则schedule_id将无法再获取到日程详情
         */
        schedule_id: string,
    },
}

/**
 * 用于预定会议室的请求参数结构
 */
export type MeetingroomBookingParams = {
    /**
     * 会议主题
     */
    subject?: string,
    /**
     * 会议室id
     */
    meetingroom_id: number,
    /**
     * 预定的起始时间
     */
    start_time: number,
    /**
     * 预定的结束时间
     */
    end_time: number,
    /**
     * 预定人的userid
     */
    booker: string,
    /**
     * 参与人的userid列表
     */
    attendees?: string[],
}

/**
 * 用于预定会议室的返回结果
 */
export type MeetingroomBookingResult = {
    /**
     * 会议室的预定id
     */
    booking_id: string,
    /**
     * 会议关联日程的id
     */
    schedule_id: string,
}

/**
 * 通过日程预定会议室的请求参数
 */
export type MeetingroomBookingByScheduleParams = {
    /**
     * 会议室id
     */
    meetingroom_id: number,
    /**
     * 会议关联日程的id
     */
    schedule_id: string,
    /**
     * 预定人的userid
     */
    booker: string,
}

/**
 * 通过日程或会议预定会议室的返回结果
 */
export type MeetingroomBookingByScheduleResult = {
    /**
     * 会议室的预定的id
     */
    booking_id: string,
    /**
     * 会议室冲突日期列表，为当天0点的时间戳；使用重复日程预定会议室，部分日期与会议室预定情况冲突时返回
     */
    conflict_date: number[],
}

/**
 * 通过会议预定会议室的请求参数
 */
export type MeetingroomBookingByMeetingParams = {
    /**
     * 会议室id
     */
    meetingroom_id: number,
    /**
     * 会议id，仅可使用同应用创建的会议
     */
    meetingid: string,
    /**
     * 预定人的userid
     */
    booker: string,
}

/**
 * 取消预定会议室的请求参数
 */
export type CancelMeetingroomBookingParams = {
    /**
     * 会议室预定id
     */
    booking_id: string,
    /**
     * 是否保留日程，0-同步删除 1-保留，仅对非重复日程有效
     */
    keep_schedule?: number,
    /**
     * 对于重复日程，如果不填写此参数，表示取消所有重复预定；如果填写，则表示取消对应日期当天的会议室预定
     */
    cancel_date?: number,
}

/**
 * 查询会议室预定详情的请求参数
 */
export type MeetingroomBookingDetailParams = {
    /**
     * 会议室id
     */
    meetingroom_id: number,
    /**
     * 会议室预定id
     */
    booking_id: string,
}




