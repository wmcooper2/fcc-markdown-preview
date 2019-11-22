import React from "react";
import marked from "marked";
import "./App.css";

marked.setOptions({
  breaks: true,
  gfm: true
});

let startingText = `
# Markdown Previewer  
Change the text in the left pane to view the markdown result in the right pane. This is GitHub style markdown and it kind of looks like how I set up Vim on my machine.

## Some Thoughts
> Wow. What a pain in the butt it was to get markdown working with React for the first time. This project looks simple, but was pretty hard.

Stuff used to make this work...
1. [React](https://reactjs.org)
2. [marked.js](https://marked.js.org/#/README.md#README.md)
3. CodePen (used to prototype things)
4. Lots of patience/persistence, because... duh.

The most challenging thing was to go back through the documentation to try and understand stuff like the \`onChange\` property and \`dangerouslySetInnerHTML\` because a lot of it made no sense until I read all the stuff around it and how it works with the state and properties and so on...  

## Make sure to understand this stuff
\`\`\`bash 
1. marked.setOptions()
2. <textarea>
3. onChange
	  * the property that React needs in <textarea> tag
4. keeping the state in the parent component
5. passing props to the child components
6. using the child component to callback a function 
   defined in the parent to update the state
	  * this is really important


\`\`\`

And now for something **completely different** ...

![](https://s3-us-west-2.amazonaws.com/s.cdpn.io/1872357/smallangrypenguin.jpg)
`;

const EditPane = props => {
  return (
    <textarea
      id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"
    />
  );
};

//dangerouslySetInnerHTML is special...
//__html prop is special...
//this is where the markdown magic goes
//https://deepscan.io/docs/rules/react-bad-danger-format
const PreviewPane = props => {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{ __html: marked(props.markdown) }}
    />
  );
};

//Main component needs state and the method that will update the state object when called from the child object. Don't maintain a state in the child component.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: startingText
    };
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }
  updateMarkdown(event) {
    this.setState({
      markdown: event.target.value
    });
  }

  render() {
    return (
      <div className="bodydiv">
        <EditPane
          markdown={this.state.markdown}
          onChange={this.updateMarkdown}
        />
        <PreviewPane markdown={this.state.markdown} />
      </div>
    );
  }
}

export default App;
