async function connectAndQuery() {
  const config = {
    user: 'info',
    password: 'a1b2c3d4',
    server: 'localhost',
    database: 'veterinaria',
    options: {
      encrypt: false
    }
  };


  try {
    sql.connect(config).then((data) => {
      console.log('connected!')

      const result = await.sql.query('select * from clientes')
      console.log(result.recordset)
    })


  } catch (error) {
    console.log('error:', error);
  } finally {
    sql.close()
  }
  }

  export default connectAndQuery
