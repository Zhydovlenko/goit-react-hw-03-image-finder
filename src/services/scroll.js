const scroll = () => {
  return window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

export default scroll;
