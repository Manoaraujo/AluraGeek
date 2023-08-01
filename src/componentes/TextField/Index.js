import "./TextField.css";

const TextField = (props) => {
   const modifiedPlaceholder = `${props.placeholder}...`;

   return (
      <div className="field-text">
         <label>{props.label}</label>
         <input placeholder={modifiedPlaceholder} />
      </div>
   );
};

export default TextField;
