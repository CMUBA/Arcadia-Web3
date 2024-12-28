module hero::hero {
    use std::error;
    use std::option::{Self, Option};
    use std::signer;
    use std::string::{Self, String};
    use std::vector;

    use aptos_framework::object::{Self, ConstructorRef, Object};

    use aptos_token_objects::collection;
    use aptos_token_objects::token;
    use aptos_std::string_utils;

    const ENOT_A_HERO: u64 = 1;
    const ENOT_A_WEAPON: u64 = 2;
    const ENOT_A_GEM: u64 = 3;
    const ENOT_CREATOR: u64 = 4;
    const EINVALID_WEAPON_UNEQUIP: u64 = 5;
    const EINVALID_GEM_UNEQUIP: u64 = 6;
    const EINVALID_TYPE: u64 = 7;

    struct OnChainConfig has key {
        collection: String,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Hero has key {
        name: String,
        level: u64,
        class: String,
        race: String,
        gender: String,
        skills: vector<u64>,
        equipments: Equipments,
        inventory: vector<Object<Item>>,
        mutator_ref: token::MutatorRef,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Armor has key {
        defense: u64,
        gem: Option<Object<Gem>>,
        weight: u64,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Gem has key {
        attack_modifier: u64,
        defense_modifier: u64,
        magic_attribute: String,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Shield has key {
        defense: u64,
        gem: Option<Object<Gem>>,
        weight: u64,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Weapon has key {
        attack: u64,
        gem: Option<Object<Gem>>,
        weapon_type: String,
        weight: u64,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Item has key {
        item_type: String,
        value: u64,
    }

    struct Equipments has store {
        weapon: Option<Object<Weapon>>,
        shield: Option<Object<Shield>>,
        armor: Option<Object<Armor>>,
        helm: Option<Object<Armor>>,
        necklace: Option<Object<Armor>>,
        glove: Option<Object<Armor>>,
        ring: Option<Object<Armor>>,
        boots: Option<Object<Armor>>,
    }

    fun init_module(account: &signer) {
        let collection = string::utf8(b"Hero Quest!");
        collection::create_unlimited_collection(
            account,
            string::utf8(b"collection description"),
            collection,
            option::none(),
            string::utf8(b"collection uri"),
        );

        let on_chain_config = OnChainConfig {
            collection,
        };
        move_to(account, on_chain_config);
    }

    fun create(
        creator: &signer,
        description: String,
        name: String,
        uri: String,
    ): ConstructorRef acquires OnChainConfig {
        let on_chain_config = borrow_global<OnChainConfig>(signer::address_of(creator));
        token::create_named_token(
            creator,
            on_chain_config.collection,
            description,
            name,
            option::none(),
            uri,
        )
    }

    // Creation methods

    public fun create_hero(
        creator: &signer,
        description: String,
        name: String,
        class: String,
        race: String,
        gender: String,
        uri: String,
    ): Object<Hero> acquires OnChainConfig {
        let constructor_ref = create(creator, description, name, uri);
        let token_signer = object::generate_signer(&constructor_ref);

        let initial_skills = vector::empty<u64>();
        vector::push_back(&mut initial_skills, 100);
        vector::push_back(&mut initial_skills, 100);
        vector::push_back(&mut initial_skills, 100);

        let hero = Hero {
            name,
            level: 1,
            class,
            race,
            gender,
            skills: initial_skills,
            equipments: Equipments {
                weapon: option::none(),
                shield: option::none(),
                armor: option::none(),
                helm: option::none(),
                necklace: option::none(),
                glove: option::none(),
                ring: option::none(),
                boots: option::none(),
            },
            inventory: vector::empty(),
            mutator_ref: token::generate_mutator_ref(&constructor_ref),
        };
        move_to(&token_signer, hero);

        object::address_to_object(signer::address_of(&token_signer))
    }

    public fun create_weapon(
        creator: &signer,
        attack: u64,
        description: String,
        name: String,
        uri: String,
        weapon_type: String,
        weight: u64,
    ): Object<Weapon> acquires OnChainConfig {
        let constructor_ref = create(creator, description, name, uri);
        let token_signer = object::generate_signer(&constructor_ref);

        let weapon = Weapon {
            attack,
            gem: option::none(),
            weapon_type,
            weight,
        };
        move_to(&token_signer, weapon);

        object::address_to_object(signer::address_of(&token_signer))
    }

    public fun create_gem(
        creator: &signer,
        attack_modifier: u64,
        defense_modifier: u64,
        description: String,
        magic_attribute: String,
        name: String,
        uri: String,
    ): Object<Gem> acquires OnChainConfig {
        let constructor_ref = create(creator, description, name, uri);
        let token_signer = object::generate_signer(&constructor_ref);

        let gem = Gem {
            attack_modifier,
            defense_modifier,
            magic_attribute,
        };
        move_to(&token_signer, gem);

        object::address_to_object(signer::address_of(&token_signer))
    }

    public fun create_item(
        creator: &signer,
        description: String,
        name: String,
        item_type: String,
        value: u64,
        uri: String,
    ): Object<Item> acquires OnChainConfig {
        let constructor_ref = create(creator, description, name, uri);
        let token_signer = object::generate_signer(&constructor_ref);

        let item = Item {
            item_type,
            value,
        };
        move_to(&token_signer, item);

        object::address_to_object(signer::address_of(&token_signer))
    }

    // Transfer wrappers

    public fun hero_equip_weapon(owner: &signer, hero: Object<Hero>, weapon: Object<Weapon>) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        option::fill(&mut hero_obj.equipments.weapon, weapon);
        object::transfer_to_object(owner, weapon, hero);
    }

    public fun hero_unequip_weapon(owner: &signer, hero: Object<Hero>, weapon: Object<Weapon>) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        let stored_weapon = option::extract(&mut hero_obj.equipments.weapon);
        assert!(stored_weapon == weapon, error::not_found(EINVALID_WEAPON_UNEQUIP));
        object::transfer(owner, weapon, signer::address_of(owner));
    }

    public fun weapon_equip_gem(owner: &signer, weapon: Object<Weapon>, gem: Object<Gem>) acquires Weapon {
        let weapon_obj = borrow_global_mut<Weapon>(object::object_address(&weapon));
        option::fill(&mut weapon_obj.gem, gem);
        object::transfer_to_object(owner, gem, weapon);
    }

    public fun weapon_unequip_gem(owner: &signer, weapon: Object<Weapon>, gem: Object<Gem>) acquires Weapon {
        let weapon_obj = borrow_global_mut<Weapon>(object::object_address(&weapon));
        let stored_gem = option::extract(&mut weapon_obj.gem);
        assert!(stored_gem == gem, error::not_found(EINVALID_GEM_UNEQUIP));
        object::transfer(owner, gem, signer::address_of(owner));
    }

    // Entry functions

    entry fun mint_hero(
        account: &signer,
        description: String,
        name: String,
        class: String,
        race: String,
        gender: String,
        uri: String,
    ) acquires OnChainConfig {
        create_hero(account, description, name, class, race, gender, uri);
    }

    entry fun set_hero_description(
        creator: &signer,
        collection: String,
        name: String,
        description: String,
    ) acquires Hero {
        let (hero_obj, hero) = get_hero(
            &signer::address_of(creator),
            &collection,
            &name,
        );
        let creator_addr = token::creator(hero_obj);
        assert!(creator_addr == signer::address_of(creator), error::permission_denied(ENOT_CREATOR));
        token::set_description(&hero.mutator_ref, description);
    }

    // View functions
    #[view]
    fun view_hero(creator: address, collection: String, name: String): Hero acquires Hero {
        let token_address = token::create_token_address(
            &creator,
            &collection,
            &name,
        );
        move_from<Hero>(token_address)
    }

    #[view]
    fun view_hero_by_object(hero_obj: Object<Hero>): Hero acquires Hero {
        let token_address = object::object_address(&hero_obj);
        move_from<Hero>(token_address)
    }

    #[view]
    fun view_object<T: key>(obj: Object<T>): String acquires Armor, Gem, Hero, Shield, Weapon {
        let token_address = object::object_address(&obj);
        if (exists<Armor>(token_address)) {
            string_utils::to_string(borrow_global<Armor>(token_address))
        } else if (exists<Gem>(token_address)) {
            string_utils::to_string(borrow_global<Gem>(token_address))
        } else if (exists<Hero>(token_address)) {
            string_utils::to_string(borrow_global<Hero>(token_address))
        } else if (exists<Shield>(token_address)) {
            string_utils::to_string(borrow_global<Shield>(token_address))
        } else if (exists<Weapon>(token_address)) {
            string_utils::to_string(borrow_global<Weapon>(token_address))
        } else {
            abort EINVALID_TYPE
        }
    }

    inline fun get_hero(creator: &address, collection: &String, name: &String): (Object<Hero>, &Hero) {
        let token_address = token::create_token_address(
            creator,
            collection,
            name,
        );
        (object::address_to_object<Hero>(token_address), borrow_global<Hero>(token_address))
    }

    
    public fun update_skill(hero: &mut Hero, skill_index: u64, new_value: u64) {
        if (skill_index < vector::length(&hero.skills)) {
            *vector::borrow_mut(&mut hero.skills, skill_index) = new_value;
        }
    }

    
    public fun add_skill(hero: &mut Hero, skill_value: u64) {
        vector::push_back(&mut hero.skills, skill_value);
    }

    
    public fun get_skill(hero: &Hero, skill_index: u64): u64 {
        if (skill_index < vector::length(&hero.skills)) {
            *vector::borrow(&hero.skills, skill_index)
        } else {
            0
        }
    }

    #[test(account = @hero)]
    fun test_hero_skills(account: &signer) acquires Hero, OnChainConfig {
        init_module(account);

        let hero_obj = create_hero(
            account,
            string::utf8(b"Test Hero"),
            string::utf8(b"TestHero"),
            string::utf8(b"Warrior"),
            string::utf8(b"Human"),
            string::utf8(b"Male"),
            string::utf8(b""),
        );

        let hero_addr = object::object_address(&hero_obj);
        let hero = borrow_global_mut<Hero>(hero_addr);

        assert!(vector::length(&hero.skills) == 3, 0);
        assert!(get_skill(hero, 0) == 100, 1);
        assert!(get_skill(hero, 1) == 100, 2);
        assert!(get_skill(hero, 2) == 100, 3);

        update_skill(hero, 0, 150);
        assert!(get_skill(hero, 0) == 150, 4);

        add_skill(hero, 80);
        assert!(vector::length(&hero.skills) == 4, 5);
        assert!(get_skill(hero, 3) == 80, 6);
    }

    #[test(account = @hero)]
    fun test_hero_equipment(account: &signer) acquires Hero, OnChainConfig {
        init_module(account);

        let hero_obj = create_hero(
            account,
            string::utf8(b"Test Hero"),
            string::utf8(b"TestHero"),
            string::utf8(b"Warrior"),
            string::utf8(b"Human"),
            string::utf8(b"Male"),
            string::utf8(b""),
        );

        let hero_addr = object::object_address(&hero_obj);
        let hero = borrow_global<Hero>(hero_addr);

        assert!(option::is_none(&hero.equipments.weapon), 0);
        assert!(option::is_none(&hero.equipments.armor), 1);
        assert!(option::is_none(&hero.equipments.shield), 2);
        assert!(vector::length(&hero.inventory) == 0, 3);
        assert!(hero.level == 1, 4);
    }
}