export const getPages = (activePage: number, allCount: number, countPage: number): void => {
  const btnNext = (document.getElementById('next') as HTMLButtonElement);
  const btnPrev = (document.getElementById('prev') as HTMLButtonElement);

  if (activePage * countPage < allCount) {
    btnNext.disabled = false;
  } else {
    btnNext.disabled = true;
  }
  if (activePage > 1) {
    btnPrev.disabled = false;
  } else {
    btnPrev.disabled = true;
  }
};
