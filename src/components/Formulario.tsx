import React, { useState } from 'react';

export default function Formulario() {


    const [form, setForm] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        mensagem: "",
        confirmation: false

    })

    const [errors, setErrors] = useState({})
    const [formSubmit, setFormSubmit] = useState(false)

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        })
    }
    console.log(form)

    const validateForm = () => {
        let newErros = {}
        if (!form.nome) newErros.nome = 'Nome obrigatório!'
        if (!form.sobrenome) newErros.sobrenome = 'Sobrenome Obrigatório!'
        if (!form.email) {
            newErros.email = 'Email obrigatório!'
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErros.email = 'Email inválido.'
        }
        if (!form.mensagem) newErros.mensagem = 'Insira uma mensagem.'
        if (!form.confirmation) newErros.confirmation = 'Campo obrigatório!'
        return newErros
    }


    const handleSubmit = (ev) => {
        ev.preventDefault()
        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        } else {
            setFormSubmit(true)
        }
    }

    const fecharConfirm = () => {
        setFormSubmit(false)
        setForm({nome: "",
            sobrenome: "",
            email: "",
            mensagem: "",
            confirmation: false})
    }


    return (
        <div className="flex flex-col justify-center items-center p-6 m-5 bg-white shadow-lg w-[550px]">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Entre em contato</h1>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <section className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            name='nome'
                            id='name'
                            onChange={handleChange}
                            value={form.nome}
                            className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none p-2"
                        />
                        <label htmlFor="name" className="mt-1 text-gray-500">Nome <span className="text-red-500">*</span></label>
                        {errors.nome && <p className='text-red-500 text-[11px]'>{errors.nome}</p>}
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            name='sobrenome'
                            id='surname'
                            onChange={handleChange}
                            value={form.sobrenome}
                            className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none p-2"
                        />
                        <label htmlFor="surname" className="mt-1 text-gray-500">Sobrenome<span className="text-red-500">*</span></label>
                        {errors.sobrenome && <p className='text-red-500 text-[11px]'>{errors.sobrenome}</p>}
                    </div>
                </section>

                <section>
                    <input
                        type="email"
                        name='email'
                        id='e-mail'
                        onChange={handleChange}
                        value={form.email}
                        className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none p-2"
                    />
                    <label htmlFor="e-mail" className="mt-1 text-gray-500">Email <span className="text-red-500">*</span></label>
                    {errors.email && <p className='text-red-500 text-[11px]'>{errors.email}</p>}
                </section>

                <section>
                    <textarea
                        name='mensagem'
                        id='msg'
                        value={form.mensagem}
                        onChange={handleChange}
                        placeholder="Digite sua mensagem"
                        rows={4}
                        className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none p-2"
                    ></textarea>
                    <label htmlFor="msg" className="mt-1 text-gray-500">Mensagem <span className="text-red-500">*</span></label>
                    {errors.mensagem && <p className='text-red-500 text-[11px]'>{errors.mensagem}</p>}
                </section>

                <section className="space-y-4">
                    <div >
                        <div className="flex items-center space-x-2">

                            <input
                                type="checkbox"
                                name="confirmation"
                                id="confirm"
                                onChange={handleChange}
                                checked={form.confirmation}
                                className="text-teal-500 focus:ring-teal-500"
                            />
                            <label
                                htmlFor="confirm"
                                className="text-sm text-gray-600"
                            >
                                Aceito ser contatado(a) por e-mail
                            </label>

                        </div>
                        {errors.confirmation && <p className='text-red-500 text-[11px]'>{errors.confirmation}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-600 transition duration-300"
                    >
                        Enviar
                    </button>
                </section>

            </form>

            {formSubmit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg m-4">
                        <h2 className="text-xl font-bold mb-4">Formulário enviado com sucesso!</h2>
                        <button onClick={fecharConfirm} className="bg-teal-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-600 transition duration-300" > Fechar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
