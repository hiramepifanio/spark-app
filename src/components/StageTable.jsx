import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";


export default function StageTable({ stage, handleOpenAddEditStageDialog, handleOpenDeleteStageDialog }) {
  return (
    <Box className="w-full !mb-4">
      <Paper className="w-full">
        <Toolbar className="bg-gray-200 !px-4">
          <Typography className="!mr-2" component={'div'} variant="h6">{stage.name}</Typography>
          <Typography className="!mr-2" component={'div'} variant="body2">
            {`(${stage.projects.length})`}
          </Typography>
          <Box className='grow' />
          <IconButton>
            <Edit onClick={() => handleOpenAddEditStageDialog(stage)}/>
          </IconButton>
          <IconButton onClick={() => handleOpenDeleteStageDialog(stage)}>
            <Delete />
          </IconButton>
        </Toolbar>
        {stage.projects.length > 0 &&
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Nome
                  </TableCell>
                  <TableCell>
                    Descrição
                  </TableCell>
                  <TableCell>
                    Dono
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stage.projects.map(project => (
                  <TableRow
                    key={project.id}
                    hover
                    onClick={() => console.log('click')}
                  >
                    <TableCell>
                      {project.name}
                    </TableCell>
                    <TableCell>
                      {project.description}
                    </TableCell>
                    <TableCell>
                      {project.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Paper>
    </Box>
  )
}