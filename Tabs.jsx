const Tabs = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    return (
      <div>
        <div className="tab-list">
          {React.Children.map(children, (child, index) => (
            <button onClick={() => setActiveIndex(index)}>
              {child.props.label}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {React.Children.toArray(children)[activeIndex]}
        </div>
      </div>
    );
  };
  
  const Tab = ({ children }) => <div>{children}</div>;
  
  const App = () => (
    <Tabs>
      <Tab label="Tab 1">Content for Tab 1</Tab>
      <Tab label="Tab 2">Content for Tab 2</Tab>
      <Tab label="Tab 3">Content for Tab 3</Tab>
    </Tabs>
  );
  