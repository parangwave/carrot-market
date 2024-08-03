"use server"

export async function handleForm(prevState: any, formData: FormData) {
  // nextjs create route-handler for POST method automatically
  // auto sending data for BE
  // need name in input to get data from form (network>payload)

  // 사용자가 계속 클릭해서 race condition에 들어가는 것을 방지함
  // 1. 사용자에게 이 server action이 시간이 좀 걸린다는 것을 알려줌
  // 2. 버튼을 비활성화

  return {
    errors: ["wrong password", "password too short"],
  }
}
