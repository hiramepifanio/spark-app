import { ChangeEvent, FormEventHandler, useState } from "react";
import { DialogState } from "../hooks/useDialogState";
import { Project } from "../models/project";
import AddEditDialog from "./AddEditDialog";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import CurrencyFormatCustom from "./CurrencyFormatCustom";

interface AddEditProjectDialogProps {
  state: DialogState<Project>
  submitHandler: FormEventHandler<HTMLFormElement> 
}

const innovationTypes = ['Produto', 'Serviço', 'Processo de Negócios', 'Modelo']
// const durationUnits = ['Dias', 'Semanas', 'Meses', 'Anos']
// const currencies = ['BRL', 'USD']

export default function AddEditProjectDialog({ state, submitHandler }: AddEditProjectDialogProps) {
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");
  const [benefit, setBenefit] = useState("");
  // const [duration, setDuration] = useState('')
  const maxChars = 255;

  // function handleDurationChange(e: ChangeEvent<HTMLInputElement>): void {
  //   const value = e.target.value
  //   if (value === "" || /^[1-9][0-9]*$/.test(value)) {
  //     setDuration(value);
  //   }
  // }

  return (
      <AddEditDialog
        isOpen={state.isOpen} 
        mode={state.subject ? 'edit' : 'add'} 
        description={'projeto'} 
        cancelHandler={state.close}
        submitHandler={submitHandler}
      >
        <TextField
          id="name"
          name="name"
          label="Nome"
          placeholder="Digite o nome do projeto"
          type="text"
          required
          autoFocus
          defaultValue={state.subject?.name || ""}
        />
        <TextField
          id="description"
          name="description"
          label="Descrição"
          placeholder="Descreva o projeto"
          type="text"
          // defaultValue={state.subject?.description || ""}
          multiline
          value={description}
          onChange={e => setDescription(e.target.value)}
          error={description.length > maxChars}
          helperText={`${description.length}/${maxChars}`}
        />
        <TextField
          id="problem"
          name="problem"
          label="Problema Resolvido"
          placeholder="Descreva o problema que o projeto resolve"
          type="text"
          // defaultValue={state.subject?.problem || ""}
          multiline
          value={problem}
          onChange={e => setProblem(e.target.value)}
          error={problem.length > maxChars}
          helperText={`${problem.length}/${maxChars}`}
        />
        <TextField
          id="benefit"
          name="benefit"
          label="Benefício Esperado"
          placeholder="Descreva o benefício esperado do projeto"
          type="text"
          multiline
          value={benefit}
          onChange={e => setBenefit(e.target.value)}
          error={benefit.length > maxChars}
          helperText={`${benefit.length}/${maxChars}`}
        />
        <FormControl fullWidth>
          <InputLabel id="innovationTypeLabel">Tipo de Inovação</InputLabel>
          <Select
            labelId="innovationTypeLabel"
            id="innovationType"
            name="innovationType"
            defaultValue={''}
            label="Tipo de Inovação"
          >
          {innovationTypes.map(type => (
            <MenuItem value={type}>{type}</MenuItem>
          ))}
          </Select>
        </FormControl>
        <Stack direction={'row'} gap={2}>
          <TextField
            id="cost"
            name="cost"
            label="Custo Estimado"
            placeholder="Ex: R$ 1.000,00"
            type="text"
            fullWidth
          />
          <TextField
            id="duration"
            name="duration"
            label="Duração Estimada"
            placeholder="Ex: 9 meses"
            type="text"
            fullWidth
          />
        </Stack>
        {/* <Stack direction={'row'} gap={2}>
          <TextField
            id="cost"
            name="cost"
            label="Custo Estimado"
            placeholder="Ex: R$ 1.000,00"
            required
            fullWidth
            slotProps={{
              input: {
                inputComponent: CurrencyFormatCustom as any,
              },
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="currencyLabel">Moeda</InputLabel>
            <Select
              labelId="currencyLabel"
              id="currency"
              defaultValue={currencies[0]}
              label="Moeda"
              required
            >
            {currencies.map(currency => (
              <MenuItem value={currency}>{currency}</MenuItem>
            ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={'row'} gap={2}>
          <TextField
            id="duration"
            name="duration"
            label="Duração Estimada"
            placeholder="Ex: 30"
            required
            fullWidth
            value={duration}
            onChange={handleDurationChange}
          />
          <FormControl fullWidth>
            <InputLabel id="durationUnitLabel">Medida de Duração</InputLabel>
            <Select
              labelId="durationUnitLabel"
              id="durationUnit"
              defaultValue={durationUnits[2]}
              label="Medida de Duração"
              required
            >
            {durationUnits.map(unit => (
              <MenuItem value={unit}>{unit}</MenuItem>
            ))}
            </Select>
          </FormControl>
        </Stack> */}
      </AddEditDialog>
  )
}