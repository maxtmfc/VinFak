import * as React from 'react';
import { useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { Button, Stack, TextField } from '@mui/material';
import { InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { createNewRecord, loadWineThunk } from '../../features/redux/slices/wine/wineThunk';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function StatForm(): JSX.Element {
  const arrWineCat = useAppSelector((store) => store.setAllWine.allWine);
  const allWine = arrWineCat.map((wine) => wine.title);
  console.log(arrWineCat, '========== у клиента');
  

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadWineThunk());
  }, []);

  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate(-1);
  };
  const [personName, setPersonName] = React.useState<string[]>([]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userId = parseInt(formData.get('userId') as string, 10);
    const count = parseFloat(formData.get('count') as string);
    const title = formData.get('title');
    const newFormData = {
      userId,
      title,
      count,
    };    
    dispatch(createNewRecord(newFormData));
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>): void => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <form onSubmit={submitHandler} className="newrecordForm">
      <TextField
        id="outlined-multiline-flexible"
        label="ID клиента"
        name="userId"
        type="number"
        sx={{ m: 1, width: '25ch' }}
      />
      <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
        <InputLabel id="demo-multiple-name-label">Наименование позиции</InputLabel>
        <Select
          // labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          name="title"
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {allWine.map((oneWine) => (
            <MenuItem key={oneWine} value={oneWine}>
              {oneWine}
            </MenuItem>
          ))}
        </Select>
        <InputNumber defaultValue={0} name="count" />
      </FormControl>
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="outlined" sx={{ m: 1, height: 40 }}>
          Принять зачёт
        </Button>
        <Button onClick={clickHandler} variant="outlined" sx={{ m: 1, height: 40 }}>
          Назад
        </Button>
      </Stack>
    </form>
  );
}
