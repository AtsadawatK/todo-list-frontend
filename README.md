
# To-Do List Project Frontned

ในส่วนของโปรเจ็คนี้ในฝั่งของ Frontend ใช้ Html JavaScript มี Framework ที่ใช้คือ React(Next) และในส่วนของ Css ใช้ Tailwind Css และ Material-UI ด้วยกัน และใช้ Library Sweertalert2 เพื่อแสดง Alert ต่างๆ และผมได้ทำการสร้าง Api ด้วย Node.js Express.js Mongodb เพื่อทำการ CRUD ข้อมูล Tasks




## Deploy
Deploy ด้วย Vercel
 - https://todo-list-frontend-cyan.vercel.app/

## Detail

ในโปรเจ็คนี้มีทั้งหมด 3 หน้า

1. หน้าหลัก /
- มีปุ่ม Add Task ใช้สำหรับ Link ไปหน้า EditTask
- map แสดง Tasks Card ทั้งหมดที่มีอยู่ ซึ่งใน Task Card ก็จะมี Checkbox , Title , Description , Date , Edit Button , Delete Button
- ในส่วนของ Description จำนวนตัวอักษรได้กำหนดให้แสดงไม่เกิน 210 Character เท่านั้น ป้องกันการแสดงเกินขอบ Card ไป เนื่องจากไม่มีหน้าแยก หากต้องการดู Description ที่เกิน 210 ต้องเข้าไปที่หน้า Edit Task
- ส่วนของ Date ในที่นี้ผมได้เปลี่ยน Format ของวันที่ให้แสดงในรูปแปบตัวอย่าง 12 JAN 2024
- เพิ่มการ Scroll ในส่วนของ Task Card
- ปุ่ม Delete เมื่อกดปุ่มนี้จะมี Alert ขึ้นมาเพื่อให้ผู้ใช้ตรวจสอบความแน่ใจก่อนกดยืนยัน
- Checkbox เมื่อกด Checked จะมี Alert ขึ้นเพื่อแจ้งเตือนว่าได้ทำการบันทึกสำเร็จ และขีดฆ่าข้อความ Title และเปลี่ยนสีของ Card เพื่อแสดงว่า Tasks นี้ Checked แล้ว
- มี Animation ของ Background โดยใช้ Particle.js Library เพื่อความสวยงาม
- ทำ Skeleton เป็นอนิเมชั่นให้แสดงขณะรอโหลดข้อมูล ทำให้ผู้ใช้ไม่ได้รู้สึกว่าเว็บเราช้า

2. หน้าเพิ่ม Task /AddTask
- มีปุ่มในหน้านี้คือ Back Btn , Addtask Btn
- และมี Fields ทั้งหมด 4 fields โดยจะเรียงตามลำดับ Title: Input , Description: Textarea , Date: Date Picker
- และมีการทำ Validation
    สำหรับ Input,Description,Date ไม่สามารถปล่อยเป็นค่าว่างได้ หากเป็นค่าว่างจะขึ้นข้อความเตือนสำแดง
    และถ้าหากมี Fields ใดๆก็ตามที่ยังไม่ได้หรอกข้อมูล ปุ่ม AddTask จะเป็น Disabled
- สำหรับ Date Picker จะไม่สามารถเลือกวันในอดีตได้
- เมื่อกดปุ่ม Addtask จะมี Alert ขึ้นมา เพื่อยืนยันการเพิ่ม

3. หน้าแก้ไข Task /EditTask
- Fields , Validation และ ปุ่ม เหมือนกันกับข้อ (2.)
- มีการดึงข้อมูลของ Task นั้นผ่าน ID เพื่อให้แสดงข้อมูลที่จะทำการแก้ไข



