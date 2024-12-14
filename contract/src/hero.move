module arcadia::hero {
    use std::error;
    use std::option::{Self, Option};
    use std::string::{Self, String};
    use std::signer;
    use aptos_framework::object::{Self, Object};
    use aptos_token_objects::collection;
    use aptos_token_objects::token;
    use aptos_std::string_utils;

    /// The hero does not exist
    const EHERO_DOES_NOT_EXIST: u64 = 1;
    /// The provided signer is not the hero owner
    const ENOT_OWNER: u64 = 2;
    /// The hero is not strong enough
    const EHERO_NOT_STRONG_ENOUGH: u64 = 3;
    /// The hero's health is too low
    const EHERO_LOW_HEALTH: u64 = 4;

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Hero has key {
        name: String,
        description: String,
        uri: String,
        level: u64,
        health: u64,
        experience: u64,
        armor: Option<Object<Armor>>,
        weapon: Option<Object<Weapon>>,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Armor has key {
        defense: u64,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Weapon has key {
        attack: u64,
    }

    fun init_module(creator: &signer) {
        let collection = string::utf8(b"Arcadia Heroes");
        let description = string::utf8(b"Heroes of the Arcadia Universe");
        let uri = string::utf8(b"https://arcadia.com/collection/heroes");

        collection::create_unlimited_collection(
            creator,
            description,
            collection,
            option::none(),
            uri,
        );
    }

    public entry fun mint_hero(
        player: &signer,
        name: String,
        description: String,
        uri: String,
    ) acquires Hero {
        let constructor_ref = token::create_named_token(
            player,
            string::utf8(b"Arcadia Heroes"),
            description,
            name,
            option::none(),
            uri,
        );

        let token_signer = object::generate_signer(&constructor_ref);
        let hero = Hero {
            name,
            description,
            uri,
            level: 1,
            health: 100,
            experience: 0,
            armor: option::none(),
            weapon: option::none(),
        };

        move_to(&token_signer, hero);
    }

    public entry fun level_up(player: &signer, hero: Object<Hero>) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        assert!(exists<Hero>(object::object_address(&hero)), error::not_found(EHERO_DOES_NOT_EXIST));
        assert!(object::owns(player, hero), error::permission_denied(ENOT_OWNER));
        assert!(hero_obj.experience >= hero_obj.level * 100, error::invalid_argument(EHERO_NOT_STRONG_ENOUGH));
        
        hero_obj.level = hero_obj.level + 1;
        hero_obj.health = hero_obj.health + 10;
        hero_obj.experience = 0;
    }

    public entry fun equip_armor(
        player: &signer,
        hero: Object<Hero>,
        armor: Object<Armor>,
    ) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        assert!(exists<Hero>(object::object_address(&hero)), error::not_found(EHERO_DOES_NOT_EXIST));
        assert!(object::owns(player, hero), error::permission_denied(ENOT_OWNER));
        
        hero_obj.armor = option::some(armor);
    }

    public entry fun equip_weapon(
        player: &signer,
        hero: Object<Hero>,
        weapon: Object<Weapon>,
    ) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        assert!(exists<Hero>(object::object_address(&hero)), error::not_found(EHERO_DOES_NOT_EXIST));
        assert!(object::owns(player, hero), error::permission_denied(ENOT_OWNER));
        
        hero_obj.weapon = option::some(weapon);
    }

    #[view]
    public fun get_level(hero: Object<Hero>): u64 acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).level
    }

    #[view]
    public fun get_health(hero: Object<Hero>): u64 acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).health
    }

    #[view]
    public fun get_experience(hero: Object<Hero>): u64 acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).experience
    }
} 