import Categories from '../../types/categoryTypes';

export type Donee = {
    id: number,
    name: string,
    address: Address
}

export type Address = {
    id: number,
    street: string,
    district: string,
    number: string | number,
    state: string | null,
    city: string | null
}

export interface ChildInfos {
    id: number,
    name: string,
    birthdate: Date| null
    contact: string | null,
    doneeId: number,
    created_at: Date,
    updated_at: Date
}

export interface DonationInfos {
    id: number,
    quantity: number,
    description: string | null,
    doneeId: number,
    categoryId: number,
    created_at: Date,
    category: CategoryInfos
}

export interface CategoryInfos {
    id: number,
    category: Categories
}

export interface NoteInfos {
    id: number,
    note: string,
    reminder: Date | null,
    doneeId: number,
    created_at: Date,
    updated_at: Date
}

export interface SpouseInfos {
        id: number,
        name: string,
        birthdate: Date,
        contact: string | null,
        occupation: string | null,
        rg: string | null,
        cpf: string | null,
        doneeId: number,
        created_at: Date,
        updated_at: Date,
        donee?: Donee
}

export interface ColleagueInfos {
        id: number,
        name: string,
        birthdate?: Date,
        contact: string | null,
        occupation: string | null,
        rg: string | null,
        cpf: string | null,
        doneeId: number,
        created_at: Date,
        updated_at: Date,
        donee?: Donee
}

export interface DoneeInfos {
        id: number,
        name: string,
        birthdate?: Date,
        contact: string | null,
        occupation: string | null,
        rg: string | null,
        cpf: string | null,
        doneeId: number,
        created_at: Date,
        updated_at: Date,
        colleagues: ColleagueInfos[],
        children: ChildInfos[],
        spouse: SpouseInfos[],
        address: Address,
        donations: DonationInfos[],
        notes: NoteInfos[]
}
