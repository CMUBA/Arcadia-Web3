#[test_only]
module arcadia::hero_tests {
    use std::string;
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::object::{Self, Object};
    use arcadia::hero::{Self, Hero};

    // Test constants
    const HERO_NAME: vector<u8> = b"Test Hero";
    const HERO_DESCRIPTION: vector<u8> = b"Test Hero Description";
    const HERO_URI: vector<u8> = b"https://test.uri/hero.png";

    // Error codes for testing
    const EINVALID_LEVEL: u64 = 1;
    const EINVALID_HEALTH: u64 = 2;
    const EINVALID_EXPERIENCE: u64 = 3;

    fun setup_test(aptos: &signer, player: &signer) {
        account::create_account_for_test(signer::address_of(aptos));
        account::create_account_for_test(signer::address_of(player));
    }

    #[test(aptos = @0x1, player = @0x123)]
    public fun test_mint_hero(aptos: &signer, player: &signer) {
        setup_test(aptos, player);

        // Initialize module
        hero::init_module(aptos);

        // Mint a hero
        hero::mint_hero(
            player,
            string::utf8(HERO_NAME),
            string::utf8(HERO_DESCRIPTION),
            string::utf8(HERO_URI),
        );

        // Verify hero properties
        let player_addr = signer::address_of(player);
        assert!(hero::get_level(player_addr) == 1, EINVALID_LEVEL);
        assert!(hero::get_health(player_addr) == 100, EINVALID_HEALTH);
        assert!(hero::get_experience(player_addr) == 0, EINVALID_EXPERIENCE);
    }

    #[test(aptos = @0x1, player = @0x123)]
    #[expected_failure(abort_code = 0x50003)] // EHERO_NOT_STRONG_ENOUGH
    public fun test_level_up_insufficient_exp(aptos: &signer, player: &signer) {
        setup_test(aptos, player);
        hero::init_module(aptos);

        // Mint a hero
        hero::mint_hero(
            player,
            string::utf8(HERO_NAME),
            string::utf8(HERO_DESCRIPTION),
            string::utf8(HERO_URI),
        );

        // Try to level up without enough experience (should fail)
        let player_addr = signer::address_of(player);
        hero::level_up(player, player_addr);
    }
} 