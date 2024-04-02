const PlusIcon = ({addTodo}) => {
  return (
    <svg
      style={{backgroundColor:"#b7b39b",width:25, cursor:"pointer",borderRadius:"10%"}}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#7c6f5a"
      onClick={addTodo}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

export default PlusIcon;
