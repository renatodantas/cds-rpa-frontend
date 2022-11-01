
// This function gets called at build time
// export async function getStaticProps() {
//   const results = await httpClient.get<Pagination<Cargo>>('/cargos')
//   const cargos = results.data.items

//   return {
//     props: {
//       cargos,
//     },
//   }
// }
export const getServerSideProps: GetServerSideProps = async () => {
  const cargos = await prisma.cargo.findMany({
    // include: { user: true },
    orderBy: { nome: 'asc' },
  })

  return {
    props: {
      autonomos: cargos,
    },
  }
}


interface AutonomosProps {
  autonomos: Autonomo[]
}

const Autonomos = ({ autonomos }: AutonomosProps) => {
  return (
    <div>
      <h1>Autônomos</h1>

    Chegaram {autonomos.length} autonomos.<br/>
    <pre>
      {JSON.stringify(autonomos)}
    </pre>
    Ir para <Link href='/autonomos/1'>Autonomo 1</Link>
    </div>
  )
};

export default Autonomos
