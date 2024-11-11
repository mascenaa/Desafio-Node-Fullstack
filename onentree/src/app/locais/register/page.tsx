"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
     Select, SelectContent,
     SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import CNPJmask from "@/lib/input-mask";

interface RegisterLocalProps {
     localName: string;
     localNickname: string;
     type: string;
     cnpj: string;
     cep: string;
     city: string;
     state: string;
     street: string;
     number: string;
     complement: string;
};

export default function RegisterLocal() {

     const [formData, setFormData] = useState<RegisterLocalProps>({
          localName: "",
          localNickname: "",
          type: "",
          cnpj: "",
          cep: "",
          city: "",
          state: "",
          street: "",
          number: "",
          complement: ""
     });

     async function getInfoByCEP(cep: string) {
          try {
               const resp = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json"
                    }
               });

               if (!resp.ok) {
                    throw new Error("CEP não encontrado.");
               }

               const data = await resp.json();
               setFormData((prevData) => ({
                    ...prevData,
                    city: data.city,
                    state: data.state,
                    street: data.street
               }));
          } catch (error) {
               if (error instanceof Error) {
                    console.error(error.message);
               }
          }
     }

     return (
          <section className="p-5 md:p-20">
               <div>
                    <h1>Adicionar novo local</h1>
                    <p>
                         Campos obrigatórios
                    </p>
               </div>
               <div className="bg-surfaces-surface p-5">
                    <div className="w-full">
                         <h3>Informações Básicas</h3>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Nome do Local*</p>
                                   <Input
                                        placeholder="Informe o nome do local"
                                        value={formData.localName}
                                        onChange={(e) =>
                                             setFormData({
                                                  localName: e.target.value
                                             })
                                        }
                                   />
                              </div>
                              ...formData,
                              <div className="w-full">
                                   <p>Apelido</p>
                                   <Input
                                        placeholder="Informe um apelido para o local"
                                        value={formData.localNickname}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  localNickname: e.target.value
                                             })
                                        }
                                   />
                              </div>
                         </div>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Selecione um tipo</p>
                                   <Select>
                                        <SelectTrigger className="w-full">
                                             <SelectValue
                                                  placeholder="Selecione um tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             <SelectItem value="estadio">
                                                  Estádio
                                             </SelectItem>
                                        </SelectContent>
                                   </Select>
                              </div>
                              <div className="w-full">
                                   <p>CNPj</p>
                                   <Input
                                        onChange={(e) => {
                                             setFormData({
                                                  ...formData,
                                                  cnpj: e.target.value
                                             });
                                        }}
                                        value={CNPJmask(formData.cnpj)}
                                        maxLength={18}
                                        placeholder="ex.: 00.000.000/0000-00"
                                   />
                              </div>
                         </div>
                    </div>
                    <hr className="my-5 opacity-15" />
                    <div className="w-full">
                         <h3>Localização</h3>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>CEP</p>
                                   <Input
                                        placeholder="Informe o CEP local"
                                        value={formData.cep}
                                        onChange={(e) => {
                                             if (e.target.value.length >= 8) {
                                                  getInfoByCEP(e.target.value);
                                             }
                                             setFormData({
                                                  ...formData,
                                                  cep: e.target.value
                                             });
                                        }}
                                        maxLength={8}
                                   />
                              </div>
                              <div className="w-full">
                                   <p>Cidade</p>
                                   <Input
                                        placeholder="Informe a cidade"
                                        value={formData.city}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  city: e.target.value
                                             })
                                        }
                                   />
                              </div>
                              <div className="w-full">
                                   <p>Estado</p>
                                   <Input
                                        placeholder="Informe o estado"
                                        value={formData.state}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  state: e.target.value
                                             })
                                        }
                                   />
                              </div>
                         </div>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Logradouro*</p>
                                   <Input
                                        placeholder="Informe o logradouro"
                                        value={formData.street}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  street: e.target.value
                                             })
                                        }
                                   />
                              </div>
                              <div className="w-full">
                                   <p>Número</p>
                                   <Input
                                        placeholder="Informe número do lugar"
                                        value={formData.number}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  number: e.target.value
                                             })
                                        }
                                   />
                              </div>
                         </div>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Complemento*</p>
                                   <Input
                                        placeholder="Informe o complemento"
                                        value={formData.complement}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  complement: e.target.value
                                             })
                                        }
                                   />
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}
