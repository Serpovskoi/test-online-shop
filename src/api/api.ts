import axios from "axios";

export async function getAllGoods() {
  const answer = await axios.get(
    "https://test-frontend.dev.int.perx.ru/api/goods/"
  );
  return answer.data;
}

export async function getGoodsById(data: string[]) {
  const answer = await axios.get(
    "https://test-frontend.dev.int.perx.ru/api/goods/?dealers=" + data.join(",")
  );
  return answer.data;
}

export async function getReqDealers() {
  const answer = await axios.get(
    "https://test-frontend.dev.int.perx.ru/api/dealers/"
  );
  return answer.data;
}
