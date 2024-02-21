import './App.css'
import React from "react";

const App = () => {

    const [description, setDescription] = React.useState('');
    const [pollOptions, setPollOptions] = React.useState([]);
    const [newPollOption, setNewPollOption] = React.useState('');
    const [editingOption, setEditingOption] = React.useState(null);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAddOption = () => {
        if (newPollOption.trim() && pollOptions.length < 5) {
            const newOption = {
                id: Math.random().toString(36).substring(2, 15),
                option: newPollOption,
                votes: 0
            };
            setPollOptions([...pollOptions, newOption]);
            setNewPollOption('');
        } else {
            console.error('Option data cannot be empty or you cannot add more than 5 option');
        }
    };

    const handleUpdate = (optionId) => {
        const updatedOptions = pollOptions.map((option)=>
            option.id === optionId ? {...option, option: newPollOption} : option
        );
        setPollOptions(updatedOptions);
        setEditingOption(null);
        setNewPollOption('');
    };

    const handleDeleteOption = (optionId) => {
        const remainingOption = pollOptions
            .filter((option)=> option.id !== optionId);
        setPollOptions(remainingOption);
    }

    const handleVote = (optionId) => {
        const updatedOption = pollOptions.map((option)=>
        option.id === optionId ? {...option, votes: option.votes + 1} : option
        );
        setPollOptions(updatedOption);
    }

    React.useEffect(() => {
        console.warn(pollOptions);
    }, [pollOptions])

    return (
        <main className='main'>
            <section>
                <h1>
                    Polling Application
                </h1>
                {pollOptions.length < 5 && (
                    <div className='add-div'>
                        <input
                            type='text'
                            placeholder='Option'
                            value={newPollOption}
                            onChange={(event) => setNewPollOption(event.target.value)}
                        />
                        <button onClick={handleAddOption}>
                            Add Option
                        </button>
                    </div>
                )}

                {pollOptions.length > 0 && (
                    <ul className='ul-main'>
                        {pollOptions.map((item) => (
                            <li key={item.id}>
                                {editingOption === item.id ? (
                                    <>
                                        <input
                                            type='text'
                                            placeholder='Option'
                                            value={newPollOption}
                                            onChange={(event) => setNewPollOption(event.target.value)}
                                        />
                                        <button onClick={()=> handleUpdate(item.id)}>
                                            Update
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <li key={item.id}>
                                            <span>{item.option}</span>
                                            <strong>{`Votes : ${item.votes}`}</strong>
                                        </li>
                                        <div>
                                        <button onClick={()=> setEditingOption(item.id)}>
                                                Edit
                                            </button>
                                            <button onClick={()=> handleDeleteOption(item.id)}>
                                                Delete
                                            </button>
                                            <button onClick={()=> handleVote(item.id)}>
                                                Vote
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default App;