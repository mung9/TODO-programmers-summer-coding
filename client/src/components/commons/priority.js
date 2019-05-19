// priority의 정수 값이 높을 수록 더 중요하다!
export const priority = {
  '낮음': 0,
  '보통': 1,
  '높음': 2
};

export function nextPriorityOf(priority){
  return (priority+1)%3;
}