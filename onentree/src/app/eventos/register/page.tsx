"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";

const EventosRegisterSchema = z.object({
     name: z.string().min(3),
     type: z.string(),
     date: z.string(),
     time: z.string(),
     location: z.string(),
     email: z.string().email("Email inválido"),
     phone: z.string()
});

type EventosRegisterProps = z.infer<typeof EventosRegisterSchema>;

export default function EventosRegister() {

     const [formData, setFormData] = useState<EventosRegisterProps>({
          name: "",
          type: "",
          date: "",
          time: "",
          location: "",
          email: "",
          phone: ""
     });

     const [errors, setErrors] = useState<Partial<EventosRegisterProps>>({});


     useEffect(() => {
          function getLocais() {

               fetch("http://localhost:8080/", {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json"
                    }
               })
                    .then((response) => response.json())
                    .then((data) => {
                         console.log(data);
                    })
                    .catch((error) => {
                         console.error("Error:", error);
                    });

          };

          getLocais();
     }, []);

     return (
          <section className="p-5 md:p-20">
               <div className="mb-5">
                    <h1 className="text-2xl md:text-3xl">Adicionar novo Evento</h1>
                    <p className="text-sm md:text-base">
                         *Campos obrigatórios
                    </p>
               </div>
               <div className="bg-surfaces-surface p-10 rounded-[20px]">
                    <h3>Informações Básicas</h3>
                    <div className="flex w-full justify-between gap-10 my-2">
                         <div className="w-full">
                              <p>Nome do evento</p>
                              <Input
                                   required
                                   placeholder="Informe o nome do local"
                              />

                         </div>
                         <div className="w-full">
                              <p>Selecione um tipo</p>
                              <Select
                                   required

                              >
                                   <SelectTrigger className={"w-full "}>
                                        <SelectValue
                                             placeholder="Selecione um tipo" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="stadium">
                                             Show
                                        </SelectItem>
                                        <SelectItem value="show">
                                             Futebol
                                        </SelectItem>
                                        <SelectItem value="theater">
                                             Teatro
                                        </SelectItem>
                                   </SelectContent>
                              </Select>

                         </div>
                    </div>
                    <div className="flex w-full justify-between gap-10 my-2">
                         <div className="w-full">
                              <p>Data do evento</p>
                              <Input
                                   required
                                   type="date"
                                   placeholder="Informe o nome do local"
                              />
                         </div>
                         <div className="w-full">
                              <p>Horario do evento</p>
                              <Input
                                   required
                                   type="time"
                                   placeholder="Informe o nome do local"
                              />
                         </div>
                    </div>
                    <div className="flex w-full justify-between gap-10 my-2">
                         <div className="w-full">
                              <p>Selecione um local</p>
                              <Select
                                   required
                              >
                                   <SelectTrigger className={"w-full "}>
                                        <SelectValue
                                             placeholder="Selecione um tipo" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="stadium">
                                             Show
                                        </SelectItem>
                                   </SelectContent>
                              </Select>
                              <p className="text-right text-sky-200 text-sm ">Cadastrar local</p>
                         </div>
                    </div>
                    <hr className="my-5 opacity-15" />
                    <h3>Informações Básicas</h3>
                    <div className="flex w-full justify-between gap-10 my-2">
                         <div className="w-full">
                              <p>Email</p>
                              <Input
                                   required
                                   type="email"
                                   placeholder="Informe o nome do local"
                              />
                         </div>
                         <div className="w-full">
                              <p>Telefone</p>
                              <Input
                                   required
                                   type="tel"
                                   placeholder="Informe o nome do local"
                              />
                         </div>
                    </div>
               </div>
          </section >
     );
}