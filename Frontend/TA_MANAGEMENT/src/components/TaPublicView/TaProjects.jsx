import React from 'react'
import {ProjectCard} from "../index"

function TaProjects() {
  return (
    <div className="flex flex-col w-4/5 justify-center self-center gap-3 mt-5">
      <h1 className="text-white font-medium text-xl ">Projects</h1>
      <div className="flex flex-col  justify-center w-full gap-1 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  )
}

export default TaProjects