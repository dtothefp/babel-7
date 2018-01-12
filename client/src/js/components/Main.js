import styles from './Main.css';

const fragment = document.createDocumentFragment();
const ul = document.createElement('ul');
const things = ['bleep', 'bloop'];

things.forEach(thing => {
  const li = document.createElement('li');

  li.classList.add(styles[thing]);
  li.textContent = thing;

  ul.appendChild(li);
});

fragment.appendChild(ul);

export default fragment;
