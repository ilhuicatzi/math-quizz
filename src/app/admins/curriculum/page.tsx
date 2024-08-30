import { middlewareSession } from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"

async function CurriculumPage() {
  await middlewareSession(authOptions)

  return (
    <div>CurriculumPage</div>
  )
}

export default CurriculumPage