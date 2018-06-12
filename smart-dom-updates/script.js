let jsDiv;
let reactDiv;

const render = () => {
  // plain js
  jsDiv.innerHTML = `
    <div class="split">
      JS template
      <input />
      <p>${new Date()}</p>
    </div>
  `;

  // react
  // React.createElement(typeOfElement, options, html...)
  const divToRender = React.createElement(
    'div',
    { className: 'split'},
    'React template ',
    React.createElement('input'),
    React.createElement(
      'p',
      null,
      new Date().toString()
    )
  );
  // ReactDOM.render(reactEl, domEl);
  ReactDOM.render(divToRender, reactDiv);
};


const start = () => {
  jsDiv = document.getElementById('dateJs');
  reactDiv = document.getElementById('dateReact');
  setInterval(render, 1000);
}

document.addEventListener('DOMContentLoaded', start);
