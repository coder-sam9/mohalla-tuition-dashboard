import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter.jsx"
import Layout from "./components/layout/Layout"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  )
}
