const person = {
    name: 'John Smith',
    address: {
        line1: 'Something',
        City: 'UK',
    },
    profiles: ['Linkedin','GitHub'],
    printProfile: () => {
        person.profiles.map(
            (profile) => {
                console.log(profile)
            }
        )
    }
        //console.log(person.profiles[0])
}


export default function leaarningJS(){
    return (
        <div>
            <div>Learning JS</div>
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>Array - {person.profiles[1]}</div>
            <div>Function - {person.printProfile()}</div>
        </div>
    )
}