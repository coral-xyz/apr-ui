import ProgramMiniCard from "../components/program-mini-card";

export default function loadMorePrograms(programs, amount, buildType = false) {
  let size;

  if (programs.length < amount) {
    size = programs.length;
  } else {
    size = amount;
  }

  let component = [];
  for (let i = 0; i < size; i++) {
    component.push(
      <ProgramMiniCard
        key={programs[i].id}
        name={programs[i].name}
        address={programs[i].address}
        verified={programs[i].verified}
        id={buildType && programs[i].id}
        buildStatus={programs[i].buildStatus}
      />
    );
  }

  return component;
}
