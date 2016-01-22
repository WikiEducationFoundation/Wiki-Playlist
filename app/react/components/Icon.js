const _colors = {
  twitter: '#50ABF1',
  facebook: '#3956A0',
  wiki: '#444',
  teal: '#15B5C2',
  black: '#050618',
  blue: '#016AFE',
  smalt: '#00449B',
  'mine-shaft': '#3F3F3F',
  silver: '#B1B1B1'
}

export default class Icon extends React.Component {

  renderGraphic() {
    const { fill } = this.props;
    let fillColor = 'black';
    if(fill !== undefined) {
      if(_colors[fill] !== undefined) {
        fillColor = _colors[fill];  
      } else {
        fillColor = fill;
      }
    }
    switch (this.props.icon) {
      case 'caret-down':
        return (
          <g><path fill={fillColor} d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z"/></g>
        );
      case 'edit':
        return (
          <g><path fill={fillColor} d="M3 17.25v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
        );
      case 'external-link':
        return (
          <g><path fill={fillColor} d="M19 19h-14v-14h7v-2h-7c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zm-5-16v2h3.59l-9.83 9.83 1.41 1.41 9.83-9.83v3.59h2v-7h-7z"></path></g>
        );
    }
  }

  render() {
    let styles = _.assign({}, this.props.style, {
      fill: "currentcolor",
      verticalAlign: "middle",
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    });

    return (
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
        style={styles}>
          {this.renderGraphic()}
      </svg>
    );
  }
}