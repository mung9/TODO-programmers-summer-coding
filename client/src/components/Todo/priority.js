// priority의 정수 값이 높을 수록 더 중요하다!
export const priority = {
  NORMAL: 0,
  IMPORTANT: 1,
  VERY_IMPORTANT: 2
};

export function nextPriorityOf(priority){
  return (priority+1)%3;
}