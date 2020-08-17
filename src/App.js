import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import createMarkup from "./markupGenerator";

const styles = {
  h4: {
    marginTop: "40px"
  },
  container: {
    maxWidth: "700px"
  },
  textField: {
    display: "flex",
    marginTop: "20px"
  },
  button: {
    marginTop: "50px"
  }
};

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reason, setReason] = useState("");
  const [tested, setTested] = useState("");
  const [jira, setJira] = useState("");
  const [exceptions, setExceptions] = useState("");
  const [check0, setCheck0] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);

  const checkItems = [
    {
      label: "Bug fix (a non-breaking change that fixes an issue)",
      get: () => check0,
      set: setCheck0
    },
    {
      label: "New feature (a non-breaking change that adds functionality)",
      get: () => check1,
      set: setCheck1
    },
    {
      label:
        "Refactoring (a non-breaking change that does not impact the functionality or fix an issue)",
      get: () => check2,
      set: setCheck2
    },
    {
      label:
        "Breaking change (fix or feature that would cause existing functionality to change)",
      get: () => check3,
      set: setCheck3
    },
    {
      label: "This change requires a documentation update",
      get: () => check4,
      set: setCheck4
    },
    {
      label: "This change requires a build update (include details below)",
      get: () => check5,
      set: setCheck5
    },
    {
      label: "This change requires a release update (include details below)",
      get: () => check6,
      set: setCheck6
    }
  ];

  const CheckBox = ({ item }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checkItems[item].get()}
            onChange={() => checkItems[item].set(prev => !prev)}
          />
        }
        label={checkItems[item].label}
      />
    );
  };

  const onCreateMarkup = () => {
    const markup = createMarkup(
      title,
      content,
      reason,
      checkItems,
      tested,
      jira,
      exceptions
    );
    copyTextToClipboard(markup);
  };

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      alert("Copied to clipboard");
    } catch (err) {
      console.log(text);
    }
    document.body.removeChild(textArea);
  }

  return (
    <div className="App">
      <h1>Commit Markup Maker</h1>
      <div style={styles.container}>
        <TextField
          label="Title"
          style={styles.textField}
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          label="Contents of Pull Request"
          style={styles.textField}
          value={content}
          multiline
          onChange={e => {
            setContent(e.target.value);
          }}
        />
        <TextField
          label="Why change is needed"
          style={styles.textField}
          value={reason}
          multiline
          onChange={e => {
            setReason(e.target.value);
          }}
        />

        <h4 style={styles.h4}>Type of Change</h4>

        <CheckBox item={0} />
        <CheckBox item={1} />
        <CheckBox item={2} />
        <CheckBox item={3} />
        <CheckBox item={4} />
        <CheckBox item={5} />
        <CheckBox item={6} />

        <TextField
          label="How the change has been Tested"
          style={styles.textField}
          value={tested}
          multiline
          onChange={e => {
            setTested(e.target.value);
          }}
        />

        <TextField
          label="JIRA Ticket Number"
          style={styles.textField}
          value={jira}
          onChange={e => {
            setJira(e.target.value);
          }}
        />

        <TextField
          label="Exceptions"
          style={styles.textField}
          value={exceptions}
          multiline
          onChange={e => {
            setExceptions(e.target.value);
          }}
        />

        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          onClick={onCreateMarkup}
        >
          Create Markup
        </Button>
      </div>
    </div>
  );
}
