// ts로 만듦 -> sql로서 db로 전달 -> db는 sql 객체로 응답 -> prisma는 ts obj로 변경
import { PrismaClient } from "@prisma/client"

// client 사용을 위해 초기화
const db = new PrismaClient()

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  })
  console.log(token)
}
test()

export default db
