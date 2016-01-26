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
      case 'search':
        return (
          <g><path d="M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"></path></g>
        );
      case 'play':
        return (
          <g><path d="M8 5v14l11-7z"></path></g>
        );
      case 'play-circle':
        return (
          <g><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
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