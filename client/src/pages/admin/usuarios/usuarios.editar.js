import React, { useState,useEffect } from 'react';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import api from '../../../services/api';
import {useParams} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mdTheme = createTheme();

function UsuarioAtualizar() {
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [tipo, setTipo] = useState('');

  const {idUsuario} = useParams();

  useEffect(()=>{
    async function getUsuario(){
      var response = await api.get('/api/usuarios.details/'+idUsuario);
      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setSenha(response.data.senha_usuario);
      setTipo(response.data.tipo_usuario);
    }
    getUsuario();
  },[])
  
  async function handleSubmit(){
    
    if(nome!==''&& email!=='' && senha!==''&& tipo!==''){

      const data = {nome_usuario:nome,
        email_usuario:email,
        senha_usuario:senha,
        tipo_usuario:tipo,
        id:idUsuario
      }
      
        console.log(data);

      const response = await api.put('/api/usuarios/'+idUsuario,data);

      if(response.status === 200){
        window.location.href='/admin/usuarios'
      }else{
        alert('Erro ao atualizar o Usuario');
      }
    }else{  
      alert('Campos devem ser preechidos');
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        
        <MenuAdmin title={'Usuários'} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                  }}
                >
                  <Grid item sm={12}>
                    <Button  variant="contained" color="primary" href={'/admin/usuarios'}>
                      <ArrowBackIcon />
                    </Button>
                    <Button variant="contained" href={'/admin/usuarios/cadastrar'} sx={{marginLeft:'2px'}}>
                      <AddIcon />
                    </Button>
                  </Grid>
                  <h2>Atualização de Usuario</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="nome"
                        name="nome"
                        label="Nome Completo"
                        fullWidth
                        autoComplete="Nome"
                        variant="standard"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="E-mail"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id="LabelTipo">Tipo</InputLabel>
                        <Select
                          labelId="LabelTipo"
                          id="tipo"
                          value={tipo}
                          label="Tipo"
                          onChange={e=>setTipo(e.target.value)}
                        >
                          <MenuItem value={1}>Administrador</MenuItem>
                          <MenuItem value={2}>Usuario</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        type="password"
                        id="senha"
                        name="senha"
                        label="senha"
                        fullWidth
                        autoComplete="senha"
                        variant="standard"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button variant="contained" 
                        onClick={handleSubmit}
                        sx={{
                              backgroundColor:'green',
                              color: '#fff',
                              "&:hover":{backgroundColor:"#12b912"}
                            }}
                      >
                        <SaveIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              
             
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Usuario() {
  return <UsuarioAtualizar />;
}