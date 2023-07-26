use anchor_lang::prelude::*;

declare_id!("N4JdhqzrojrrXhzMYvyAS9smq3Ekp7nuHKpZ1YuhXy6");

#[program]
pub mod solana_transito {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, img_url: String) -> Result<()> {
        let vehicle_data = &mut ctx.accounts.vehicle_data;
        vehicle_data.owner = ctx.accounts.user.key();
        vehicle_data.img_url = img_url;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(img_url: String)]
pub struct Initialize<'info> {
    #[account(
        init, 
        seeds = [
            b"vehicle_account", 
            user.key().as_ref(), 
            img_url.as_bytes()
        ], 
        bump, 
        payer = user, 
        space = 8+32+img_url.as_bytes().len()+4)
    ]
    pub vehicle_data: Account<'info, VehicleData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct VehicleData {
    pub owner: Pubkey,
    pub img_url: String,
}
