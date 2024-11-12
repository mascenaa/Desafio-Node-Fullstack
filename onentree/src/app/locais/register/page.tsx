"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
     Select, SelectContent,
     SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { CNPJmask, LimparCEP, PhoneMask } from "@/lib/input-mask";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { toast } from "sonner";

const RegisterLocalSchema = z.object({
     localName: z.string().min(1, "Nome do local é obrigatório"),
     localNickname: z.string().optional(),
     type: z.string().min(1, "Tipo é obrigatório"),
     cnpj: z.string().min(18, "CNPJ inválido"),  // considerando o formato com máscara
     cep: z.string().length(8, "CEP inválido"),
     city: z.string().min(1, "Cidade é obrigatória"),
     state: z.string().min(1, "Estado é obrigatório"),
     street: z.string().min(1, "Logradouro é obrigatório"),
     number: z.string().optional(),
     complement: z.string().optional(),
     email: z.string().email("Email inválido"),
     phone: z.string().optional(),
     entradas: z.array(z.string()).optional(),
     catracas: z.array(z.string()).optional(),
});

type RegisterLocalProps = z.infer<typeof RegisterLocalSchema>;

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
          complement: "",
          email: "",
          phone: "",
          entradas: [],
          catracas: []
     });

     const [errors, setErrors] = useState<Partial<RegisterLocalProps>>({});

     const [entradaTemp, setEntradaTemp] = useState("");
     const [catracaTemp, setCatracaTemp] = useState("");

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
                    toast.error("Erro", {
                         className: "bg-[#461527]",
                         description: "Erro ao buscar informações do CEP",
                         duration: 5000
                    });
               }
          }
     }

     const handleAddEntrada = () => {
          if (entradaTemp) {
               setFormData((prevData) => ({
                    ...prevData,
                    entradas: [...(prevData.entradas || []), entradaTemp]
               }));
               setEntradaTemp("");
          }
     };

     const handleAddCatraca = () => {
          if (catracaTemp) {
               setFormData((prevData) => ({
                    ...prevData,
                    catracas: [...(prevData.catracas || []), catracaTemp]
               }));
               setCatracaTemp("");
          }
     };

     const handleSubmit = () => {
          const result = RegisterLocalSchema.safeParse(formData);


          if (!result.success) {
               const fieldErrors = result.error.format();

               setErrors(Object.fromEntries(
                    Object
                         .entries(fieldErrors)
                         .map(([key, value]) => [key, Array.isArray(value) ? value[0] : (value as { _errors: string[] })._errors[0]])));
               return;
          }

          toast.success("Sucesso", {
               className: "bg-[#2F3B28]",
               description: "Local cadastrado com sucesso",
               duration: 5000
          }
          );
          console.log("Dados válidos:", formData);
     };

     return (
          <section className="p-5 md:p-20">
               <div className="mb-5">
                    <h1 className="text-2xl md:text-3xl">Adicionar novo local</h1>
                    <p className="text-sm md:text-base">
                         Campos obrigatórios
                    </p>
               </div>
               <div className="bg-surfaces-surface p-10 rounded-[20px]">
                    <div className="w-full">
                         <h3>Informações Básicas</h3>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Nome do Local*</p>
                                   <Input
                                        required
                                        placeholder="Informe o nome do local"
                                        value={formData.localName}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  localName: e.target.value
                                             })
                                        }
                                        className={errors.localName ? "border-[1px] border-red-500" : ""}
                                   />
                                   {errors.localName && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.localName}</p>}
                              </div>
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
                                        className={errors.localNickname ? "border-[1px] border-red-500" : ""}
                                   />
                              </div>
                         </div>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Selecione um tipo</p>
                                   <Select
                                        required
                                        onValueChange={(value) =>
                                             setFormData({
                                                  ...formData,
                                                  type: value
                                             })
                                        }
                                   >
                                        <SelectTrigger className={`w-full ${errors.type ? "border-[1px] border-red-500" : ""}`}>
                                             <SelectValue
                                                  placeholder="Selecione um tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             <SelectItem value="stadium">
                                                  Estádio
                                             </SelectItem>
                                             <SelectItem value="show">
                                                  Casa de show
                                             </SelectItem>
                                             <SelectItem value="theater">
                                                  Auditórios e Teatros
                                             </SelectItem>
                                        </SelectContent>
                                   </Select>
                                   {errors.type && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.type}</p>}
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
                                        className={errors.cnpj ? "border-[1px] border-red-500" : ""}
                                   />
                                   {errors.cnpj && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.cnpj}</p>}
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
                                        required
                                        placeholder="Informe o CEP local"
                                        value={LimparCEP(formData.cep)}
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
                                        className={errors.cep ? "border-[1px] border-red-500" : ""}
                                   />
                                   {errors.cep && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.cep}</p>}
                              </div>
                              <div className="w-full">
                                   <p>Cidade</p>
                                   <Input
                                        required
                                        placeholder="Informe a cidade"
                                        value={formData.city}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  city: e.target.value
                                             })
                                        }
                                        className={errors.city ? "border-[1px] border-red-500" : ""}
                                   />
                                   {errors.city && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.city}</p>}
                              </div>
                              <div className="w-full">
                                   <p>Estado</p>
                                   <Input
                                        required
                                        placeholder="Informe o estado"
                                        value={formData.state}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  state: e.target.value
                                             })
                                        }
                                        className={errors.state ? "border-[1px] border-red-500" : ""}
                                   />
                                   {errors.state && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.state}</p>}
                              </div>
                         </div>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Logradouro*</p>
                                   <Input
                                        required
                                        placeholder="Informe o logradouro"
                                        value={formData.street}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  street: e.target.value
                                             })
                                        }
                                        className={errors.street ? "border-[1px] border-red-500" : ""}
                                   />
                                   {errors.street && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.street}</p>}
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
                                        className={errors.number ? "border-[1px] border-red-500" : ""}
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
                                        className={errors.complement ? "border-[1px] border-red-500" : ""}
                                   />
                              </div>
                         </div>
                    </div>
                    <hr className="my-5 opacity-15" />
                    <div className="w-full">
                         <h3>Contato</h3>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Email</p>
                                   <Input
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  email: e.target.value
                                             })
                                        }
                                        placeholder="Informe o email"
                                        className={errors.email ? "border-[1px] border-red-500" : ""}
                                   />
                                   {errors.email && <p className="text-red-500 text-right text-sm mt-[0.25rem]">{errors.email}</p>}
                              </div>
                              <div className="w-full">
                                   <p>Telefone</p>
                                   <Input
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  phone: e.target.value
                                             })
                                        }
                                        value={PhoneMask(formData.phone || "")}
                                        placeholder="Informe o telefone"
                                        className={errors.phone ? "border-[1px] border-red-500" : ""}
                                   />
                              </div>
                         </div>
                    </div>
                    <hr className="my-5 opacity-15" />
                    <div className="w-full">
                         <h3>
                              Cadastro de entradas e catracas
                         </h3>
                         <div className="flex w-full justify-between gap-10 my-2">
                              <div className="w-full">
                                   <p>Entradas</p>
                                   <div className="flex">
                                        <Input
                                             placeholder="Informe a quantidade 
                                             de entradas"
                                             value={entradaTemp}
                                             onChange={(e) =>
                                                  setEntradaTemp(e.target.value)
                                             }
                                             className={errors.entradas ? "border-[1px] border-red-500" : ""}
                                        />
                                        <Button
                                             onClick={handleAddEntrada}
                                             className="bg-[#051D41] text-white text-md">
                                             +
                                        </Button>
                                   </div>
                                   <ul className="flex flex-wrap gap-2 my-5">
                                        {formData?.entradas?.map((entrada, index) => (
                                             <li key={index}>
                                                  <Badge className="bg-sky-400 
                                                  p-2 rounded-[6px]">
                                                       {entrada}
                                                  </Badge>
                                             </li>
                                        ))}
                                   </ul>
                              </div>
                              <div className="w-full">
                                   <p>Catracas</p>
                                   <div className="flex">
                                        <Input
                                             placeholder="Informe a quantidade 
                                             de catracas"
                                             value={catracaTemp}
                                             onChange={(e) =>
                                                  setCatracaTemp(e.target.value)
                                             }
                                             className={errors.catracas ? "border-[1px] border-red-500" : ""}
                                        />
                                        <Button
                                             onClick={handleAddCatraca}
                                             className="bg-[#051D41] text-white text-md">
                                             +
                                        </Button>
                                   </div>
                                   <ul className="flex flex-wrap gap-2 my-5">
                                        {formData.catracas?.map((catraca, index) => (
                                             <li key={index}>
                                                  <Badge className="bg-sky-400 
                                                  p-2 rounded-[6px]">
                                                       {catraca}
                                                  </Badge>
                                             </li>
                                        ))}
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <hr className="my-5 opacity-15" />
                    <div className="flex justify-end gap-5">
                         <Button className="border rounded-[6px]">Cancelar</Button>
                         <Button onClick={() => handleSubmit()} className="bg-white text-black rounded-[6px]">Cadastrar</Button>
                    </div>

               </div>
          </section>
     );
}
