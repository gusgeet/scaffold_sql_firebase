const express = require('express');
const app = express();
const prisma = require('@prisma/client');
const uuid = require('uuid')
const fs = require('fs')

async function getPacientes () {
  const Prisma = new prisma.PrismaClient()
  const pacientes = await Prisma.pacientes.findMany()
   return pacientes
}

async function getclinichistories() {
  const Prisma = new prisma.PrismaClient()
  const hc = await Prisma.clinichistory.findMany()
  return hc
}

async function getClientes() {
  try {
    const Prisma = new prisma.PrismaClient()
    const clientes = await Prisma.clientes.findMany()
    clientes.forEach(c => {
      let id = uuid.v1()
      c.Id = id
      c.IdEmpresa = 'a155asd98sd'   //valor a darr segun cada veterinaria
    })
    return clientes
  } catch (error) {
    console.log(error)
  }
}

// Get request
app.get('/', async function (req, res) {
  let importados = 0
  var basededatos = []
  var todoCargado = []
  let clientes = await getClientes()
  clientes.forEach(cliente => {
    cliente = JSON.stringify(cliente)
  })
  basededatos.push(clientes)
  let pacientes = await getPacientes();
 
  clientes.forEach(cliente => {
    let pacientesDecliente = pacientes.filter(x => x.id_pacientes === cliente.id_clients)
    if(pacientesDecliente)  {
      pacientesDecliente.forEach(paciente => {
        paciente.IdCliente = cliente.id
      })
    }
    //pacientesDecliente = JSON.parse(JSON.stringify(pacientesDecliente))
  })
  basededatos.push(pacientes)

  let hc = await getclinichistories()

  pacientes.forEach(paciente => {
    let hcFromPaciente = hc.filter(x => x.id_pacienthistory === paciente.pacient_idforch2)
    let idHC = uuid.v1()
    hcFromPaciente.forEach(hc => {
      hc.pacient_idforch2 = idHC
    })
    paciente.pacient_idforch2 = idHC
  })
  basededatos.push(hc)


  // basededatos.forEach(cliente => {
  //   console.log(cliente)
  //   getPacientes().then(pacientes => {
  //     pacientes.forEach(paciente => {
  //       paciente.newId = cliente.id
  //     })
  //     let clienteConPacientes = {
  //       cliente: cliente,
  //       pacientes: pacientes
  //     }
  //     clienteConPacientes = JSON.stringify(clienteConPacientes)
  //     todoCargado.push(clienteConPacientes)
  //   })
  // })
  
  res.send(basededatos)
  
});
 
let server = app.listen(5000, function () {
    
    console.log('Server is listening at port 5000...');
});