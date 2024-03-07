import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

let renderCount = 0;

type FormValues = {
    username: string
    email: string
    channel: string
}
export const YoutubeForm = () => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        console.log('submited', data);

    }
    renderCount++
    return (
        <div>
            <h2>Youtube Form ({renderCount / 2})</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {
                    required: {
                        value: true,
                        message: "Username is required!",
                    }
                })}
                />
                <p className='error'>{errors.username?.message}</p>

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" {...register("email", {
                    pattern: {
                        value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format!",
                    },
                    validate: {
                        notAdmin: (fieldValue) => {
                            return (
                                fieldValue !== "admin@example.com" ||
                                "Enter a different email address"
                            );
                        },
                        notBlackListed: (fieldValue) => {
                            return !fieldValue.endsWith('yahoo.com') || "This domain is not supported,please enter gmail domain!"
                        },
                        notBlackListed1: (fieldValue) => {
                            return !fieldValue.endsWith('mail.ru') || "This domain is not supported,please enter gmail domain!"
                        },
                        notBlackListed2: (fieldValue) => {
                            return !fieldValue.endsWith('outlook.com') || "This domain is not supported,please enter gmail domain!"
                        },
                        notBlackListed3: (fieldValue) => {
                            return !fieldValue.endsWith('icloud.com') || "This domain is not supported,please enter gmail domain!"
                        }
                    },
                })}
                />
                <p className='error'>{errors.email?.message}</p>

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel", {
                    required: {
                        value: true,
                        message: "Channel is required!"
                    }
                })} />
                <p className='error'>{errors.channel?.message}</p>
                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}
