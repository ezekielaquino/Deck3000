import ToSlug from './ToSlug';

const SetBrowserHistory = (state, section) => {
  const title = section || state.current;
  const slug = ToSlug(title.toString());

  history.replaceState(state, section, slug);
}

export default SetBrowserHistory;