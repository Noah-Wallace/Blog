import { Highlight, themes } from 'prism-react-renderer';
import './CodeBlock.css';

const CodeBlock = ({ children, className }) => {
  // Extract the language from the className
  const language = className ? className.replace(/language-/, '') : 'javascript';
  
  return (
    <Highlight
      theme={themes.nightOwl}
      code={children}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="code-block-pre" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })} className="code-line">
              <span className="line-number">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <span className="code-content">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
