#IMS

/login -> required
/ -> plan
/done
/manage

/plans/register
/plans/:id
/plans/:id/edit
/plans/:id/delete
/plans/:id/changeStatus

/pumps/register
/pumps/:id -> each pump
/pumps/:id/edit
/pumps/:id/delete

/users/:id -> 직급, 제작펌프, 공지올린것
/users/logout -> logout
/users/edit ->
/users/permit
/users/change-password -> pw change
/users/register

-->pump Schema
user:
size:big mini diaphragm water linear
name:
flowRate:
motor_type:
motor_size:
motor_voltage: motor[]
application:
version:
description:

--> order Schema
model:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Pump"}
approved_id:
ordered_date:{type:Date}
planned_manufaturing_date
manufactured_date
planned_outbound_date:
outbound_date:
manufaturingDef:
memo:

-->user Schema
name:
grade: 사장 부장 과장 대리 주임 사원 기간제
department:
email:
phoneNum:
permission:[] planUpload userEdit registerUser
