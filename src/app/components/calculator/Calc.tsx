import { Button, Grid, Paper, TextField } from "@mui/material";
import useKeyboardControl from "react-keyboard-control";
import { KeyboardHook, TypedKey } from "react-keyboard-control";
export default function Calculator(props: {result:string,setResult:(num:string)=>void,submit:()=>void}) {
    const addToResult=(num:string)=>{
        num.length?props.setResult(props.result+num):props.setResult(props.result.slice(0, -1))
    }
    const clear=()=>props.setResult("")
    const handleChange=({target:{value}}:any)=>props.setResult(value)
    const keyboardHooks: KeyboardHook[] = [
        {
          keyboardEvent: [{ key: "0" }],
          callback: () => addToResult("0"),
          
        },
        {
          keyboardEvent: [{ key: "1" }],
          callback: () => addToResult("1"),
          
        }, {
          keyboardEvent: [{ key: "2" }],
          callback: () => addToResult("2"),
          
        }, {
          keyboardEvent: [{ key: "3" }],
          callback: () => addToResult("3"),
          
        }, {
          keyboardEvent: [{ key: "4" }],
          callback: () => addToResult("4"),
          
        }, {
          keyboardEvent: [{ key: "5" }],
          callback: () => addToResult("5"),
          
        }, {
          keyboardEvent: [{ key: "6" }],
          callback: () => addToResult("6"),
          
        }, {
          keyboardEvent: [{ key: "7" }],
          callback: () => addToResult("7"),
          
        }, {
          keyboardEvent: [{ key: "8" }],
          callback: () => addToResult("8"),
          
        }, {
          keyboardEvent: [{ key: "9" }],
          callback: () => addToResult("9")     
        },
        {
            keyboardEvent: [{ key: "Backspace" }],
            callback: () => addToResult("")     
          },
          {
            keyboardEvent: [{ key: "Enter" }],
            callback: () => props.submit()     
          },
      ];
      const currentSequence: TypedKey[] = useKeyboardControl(keyboardHooks);
    
  return (
    <>
      <Paper
        sx={{
          margin: "10px 0px",
          padding: "20px",
        }}
      >
        <TextField
          variant="outlined"
          value={props.result}
          sx={{
            width: "100%",
          }}
          onChange={handleChange}
        />
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("7");
              }}
            >
              7
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("8");
              }}
            >
              8
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("9");
              }}
            >
              9
            </Button>
          </Grid>
          
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("4");
              }}
            >
              4
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("5");
              }}
            >
              5
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("6");
              }}
            >
              6
            </Button>
          </Grid>
          
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("1");
              }}
            >
              1
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("2");
              }}
            >
              2
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("3");
              }}
            >
              3
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                addToResult("0");
              }}
            >
              0
            </Button>
          </Grid>
         
          
          <Grid item xs={6}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                clear();
              }}
              variant="outlined"
            >
              LIMPIAR
            </Button>
          </Grid> <Grid item xs={6}>
            <Button
              sx={{
                width: "100%",
              }}
              onClick={() => {
                props.submit();
              }}
              variant="contained"
            >
              ACEPTAR
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
